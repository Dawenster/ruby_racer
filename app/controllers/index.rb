before do
  @game = Game.find(session[:game]) if session[:game]
end

get '/' do
  erb :index
end

post '/' do
  content_type :json
  player1 = Player.find_or_create_by_name(params[:form1][:name].downcase.strip)
  player2 = Player.find_or_create_by_name(params[:form2][:name].downcase.strip)
  game = Game.create(:player1_id => player1.id, :player2_id => player2.id)
  session[:game] = game.id
  # this needs to return JSON!
  game.to_json
  # redirect '/'
  # erb :index
end


get '/game_over' do
  redirect "/game/#{@game.url}"
end

get '/game/:id' do

  erb :game_stats
end
