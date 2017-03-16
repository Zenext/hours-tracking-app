defmodule Hours.GameView do
  use Hours.Web, :view

  alias Hours.RecordView

  import Hours.TimexHelpers, only: [to_user_format: 1]

  def render("index.json", %{games: games}) do
    Enum.map(games, &game_json/1)
  end

  def render("show.json", %{game: game}) do
    game_json(game)
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
      start_date: to_user_format(game.start_date),
      abbrevation: game.abbrevation,
      hours: RecordView.count_hours(game.records)
    }
  end
end