defmodule Hours.GameControllerTest do
  use Hours.ConnCase

  test "#index renders a list of games" do
    conn = build_conn()
    game = insert(:game)

    conn = get conn, game_path(conn, :index)

    assert json_response(conn, 200) == %{
      "games" => [%{
        "abbrevation" => game.abbrevation,
        "title" => game.title,
        "start_date" => game.start_date
      }]
    }
  end
end