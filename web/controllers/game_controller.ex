defmodule Hours.GameController do
  use Hours.Web, :controller

  alias Hours.Game
  
  import Hours.TimexHelpers, only: [to_db_format: 1]

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
    %{"id" => id} = params
    
    changeset = Game
      |> Game.by_id(id)
      |> Repo.one
      |> Game.changeset(params)

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
    date = to_db_format(params["start_date"])
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
end
