defmodule Hours.GameController do
  use Hours.Web, :controller

  alias Hours.Game
  
  import Hours.TimexHelpers, only: [to_date: 1]

  def index(conn, _params) do
    games = 
      Game
      |> Game.preload_records
      |> Game.order_by_date
      |> Repo.all
   
    render(conn, "index.json", games: games)
  end

  def show(conn, %{"id" => id}) do
    game = 
      Game
      |> Game.preload_records
      |> Repo.get!(id)

    render(conn, "show.json", game: game)
  end

  def update(conn, %{"id" => id} = params) do
    changeset = Game
      |> Game.preload_records
      |> Repo.get!(id)
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

  def create(conn, %{"start_date" => start_date} = params) do
    date = to_date(start_date)
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
      {:ok, game} ->
        game = Repo.preload(game, :records)
        
        conn
        |> put_status(200)
        |> render("show.json", game: game)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end
end
