defmodule Hours.GameController do
  use Hours.Web, :controller

  alias Hours.Game

  def index(conn, _params) do
    games = 
      Game
      |> Game.order_by_date
      |> Repo.all
   
    render(conn, "index.json", games: games)
  end

  def show(conn, %{"id" => id}) do
    game = Repo.get!(Game, id)
    render(conn, "show.json", game: game)
  end

  def update(conn, params) do
    %{"id" => id} = params
    
    game = Repo.get!(Game, id)
    changeset = Game.changeset(game, params)

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
    {:ok, date} = Timex.parse(params["start_date"], "{0D}/{0M}/{YYYY}")
    {:ok, date} = Ecto.Date.cast date
    changeset = Game.changeset(%Game{}, %{params | "start_date" => date})
    
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
