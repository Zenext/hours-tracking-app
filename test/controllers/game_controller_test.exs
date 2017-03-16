defmodule Hours.GameControllerTest do
  use Hours.ConnCase

  alias Hours.GameView

  test "#index renders a list of games" do
    conn = build_conn()
    game = insert(:game)

    conn = get conn, game_path(conn, :index)

    assert json_response(conn, 200) == render_json("index.json", games: [game])
  end

  test "#show renders a single game" do
    conn = build_conn()
    game = insert(:game)

    conn = get conn, game_path(conn, :show, game)

    assert json_response(conn, 200) == render_json("show.json", game: game)
  end

  defp render_json(template, assigns) do
    assigns = Map.new(assigns)
    
    GameView.render(template, assigns)
      |> Poison.encode!
      |> Poison.decode!
  end
end