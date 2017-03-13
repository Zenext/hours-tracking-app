defmodule Hours.GameController do
  use Hours.Web, :controller

  alias Hours.Game

  def index(conn, _params) do
    games = Repo.all(Game)
   
    render conn, "index.json", games: games
  end

  def show(conn, %{"id" => id}) do
    game = Repo.get!(Game, id)
    render(conn, "show.json", game: game)
  end

  def update(conn, params) do
    %{"id" => id, "start_date" => start_date} = params
    {:ok, start_date} = Ecto.Date.cast start_date
    
    game = Repo.get!(Game, id)
    changeset = Game.changeset(game, %{params | "start_date" => start_date})

    case Repo.update(changeset) do
      {:ok, game} ->
        conn
        |> put_status(200)
        |> render("show.json", game: game)
      {:error, changeset} ->
        render(conn, "show.json")
    end
  end

  def create(conn, params) do
    {:ok, start_date} = Ecto.Date.cast params["start_date"]
    changeset = Game.changeset(%Game{}, %{params | "start_date" => start_date})
    
    case Repo.insert(changeset) do
      {:ok, game} ->
        conn
        |> put_status(:created)
        |> render("show.json", game: game)
      {:error, _changeset} ->
        render(conn, "show.json")
    end
  end
end
