get '/' do
  erb :index
end

post '/' do
  puts params[:form1][:name]
  @player1 = Player.find_or_create_by_name(params[:form1][:name].downcase.strip)
  @player2 = Player.find_or_create_by_name(params[:form2][:name].downcase.strip)
  @game = Game.create(:player1_id => @player1.id, :player2_id => @player2.id)
  erb :index
end
