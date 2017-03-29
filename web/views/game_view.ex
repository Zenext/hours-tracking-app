defmodule Hours.GameView do
  use Hours.Web, :view

  alias Hours.TimexHelpers

  def render("index.json", %{games: games}) do
    games
    |> Enum.map(&game_json/1)
    |> Enum.sort(fn(x, y) -> x.title < y.title end)
  end

  def render("show.json", %{game: game}) do
    game_json(game)
  end

  def render("show.json", %{}) do
    %{}
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, detail)
    end)

    %{errors: errors}
  end

  def game_json(game) do
    %{
      id: game.id,
      title: game.title,
      start_date: TimexHelpers.to_user_format(game.start_date),
      abbrevation: game.abbrevation
    }
  end
end