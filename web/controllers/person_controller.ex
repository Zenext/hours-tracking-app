defmodule Hours.PersonController do
  use Hours.Web, :controller
  
  alias Hours.Person  
  
  def index(conn, _params) do
    people = Repo.all(Person)
   
    render(conn, "index.json", people: people)
  end

  def games(conn, %{"id" => id, "start_date" => start_date, "end_date" => end_date}) do
    person =
      Person
      |> Person.preload_records
      |> Person.by_time_interval(start_date, end_date)
      |> Repo.get(id)

    if person == nil do
      render(conn, "games.json", games: [])
    else
      games =
        person.records
        |> Enum.map(fn record -> record.game end)
        |> Enum.uniq 

      render(conn, "games.json", games: games)  
    end
  end

  def show(conn, %{"id" => id}) do
    person = Repo.get!(Person, id)

    render(conn, "show.json", person: person)
  end
  
  def create(conn, params) do
    changeset = Person.changeset(%Person{}, params)
    
    case Repo.insert(changeset) do
      {:ok, person} ->
        conn
        |> put_status(:created)
        |> render("show.json", person: person)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    person = Repo.get!(Person, id)
    
    case Repo.delete(person) do
      {:ok, person} ->
        conn
        |> put_status(200)
        |> render("show.json", person: person)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end
end