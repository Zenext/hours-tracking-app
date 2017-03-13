defmodule Hours.GameView do
  use Hours.Web, :view

  import Hours.TimexHelpers, only: [to_user_format: 1]

  def render("index.json", %{games: games}) do
    %{games: Enum.map(games, &game_json/1)}
  end

  def render("show.json", %{game: game}) do
    %{game: game_json(game)}
  end

  def game_json(game) do
    %{
      id: game.id,
      title: game.title,
      start_date: to_user_format(game.start_date),
      abbrevation: game.abbrevation
    }
  end
end