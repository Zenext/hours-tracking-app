defmodule Hours.Factory do
  use ExMachina.Ecto, repo: Hours.Repo

  alias Hours.{Game, Record}

  def game_factory do
    %Game{
      title: "Diamond Bonanza",
      abbrevation: "DB",
      start_date: "2017-03-03"
    }
  end
end