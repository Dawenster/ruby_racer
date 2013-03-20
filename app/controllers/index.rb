before do
  @game = Game.find(session[:game]) if session[:game]
end

get '/' do
  erb :index
end

post '/' do
  content_type :json
  
end

post '/game_over' do
  content_type :json
  puts params
  player1 = Player.find_or_create_by_name(params[:player1][:name].downcase.strip)
  player2 = Player.find_or_create_by_name(params[:player2][:name].downcase.strip)
  
  if params[:winner][:name] == player1.name
    winner = player1
  else
    winner = player2
  end

  puts params[:elapsedTime]

  game = Game.new(:player1_id => player1.id, :player2_id => player2.id, :time => params[:elapsedTime], :winner => winner.id)

  if game.save
    status 200
    "/game/#{game.url}".to_json
  else
    status 400
  end
end

get '/game/all_stats' do
  @games = Game.all
  @players = Player.all
  erb :all_stats
end

get '/game/:url' do
  @game = Game.find_by_url(params[:url])
  @player1_name = Player.find(@game.player1_id).name
  @player2_name = Player.find(@game.player2_id).name
  @winner_name = Player.find(@game.winner).name
  @elapsed_time = @game.time
  erb :game_stats
end


