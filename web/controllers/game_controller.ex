defmodule Hours.GameController do
  use Hours.Web, :controller

  alias Hours.Game
  
  import Hours.TimexHelpers, only: [to_date: 1]

  def index(conn, _params) do
    games = 
      Game
      |> Game.order_by_date
      |> Repo.all
   
    render(conn, "index.json", games: games)
  end

  def show(conn, %{"id" => id}) do
    game = Game
      |> Game.by_id(id)
      |> Repo.one

    render(conn, "show.json", game: game)
  end

  def update(conn, params) do
    changeset = Game
      |> Game.by_id(params["id"])
      |> Repo.one
      |> Game.changeset_update(params)

    case Repo.update(changeset) do
      {:ok, game} ->
        conn
        |> put_status(200)
        |> render("show.json", game: game)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

  def create(conn, params) do
    date = to_date(params["start_date"])
    changeset = Game.changeset(%Game{}, %{params | "start_date" => date})
   
    case Repo.insert(changeset) do
      {:ok, game} ->
        conn
        |> put_status(:created)
        |> render("show.json", game: game)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    game = Repo.get!(Game, id)
    
    case Repo.delete(game) do
      {:ok, _game} ->
        conn
        |> put_status(200)
        |> render("show.json")
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end
end
