defmodule Hours.PersonView do
  use Hours.Web, :view

  alias Hours.TimexHelpers

  def render("index.json", %{people: people}) do
    Enum.map(people, &person_json/1)
  end

  def render("show.json", %{person: person}) do
    person_json(person)
  end

  def render("games.json", %{games: games}) do
    Enum.map(games, &game_json/1)
  end

  def person_json(person) do
    %{
      id: person.id,
      name: person.name
    }
  end

  def game_json(game) do
    %{
      id: game.id,
      title: game.title,
      start_date: TimexHelpers.to_user_format(game.start_date),
      abbrevation: game.abbrevation,
    }
  end
end