defmodule Hours.GameViewTest do
  use Hours.ModelCase
  import Hours.Factory
  alias Hours.GameView

  test "index.json" do
    game = insert(:game)
    rendered_games = GameView.render("index.json", %{games: [game]})

    assert rendered_games == %{
      games: [GameView.game_json(game)]
    }
  end

  test "show.json" do
    game = insert(:game)
    rendered_game = GameView.render("show.json", %{game: game})

    assert rendered_game == GameView.game_json(game)
  end
end