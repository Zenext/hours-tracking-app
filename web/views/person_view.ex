defmodule Hours.PersonView do
  use Hours.Web, :view

  def render("index.json", %{people: people}) do
    Enum.map(people, &person_json/1)
  end

  def render("show.json", %{person: person}) do
    person_json(person)
  end

  def person_json(person) do
    %{
      id: person.id,
      name: person.name
    }
  end
end