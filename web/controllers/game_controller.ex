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

  def create(conn, params) do
    changeset = Game.changeset(%Game{}, params)
    
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
