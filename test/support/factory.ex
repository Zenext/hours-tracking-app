defmodule Hours.Factory do
  use ExMachina.Ecto, repo: Hours.Repo

  alias Hours.{Game, Record}

  def game_factory do
    %Game{
      title: "Diamond Bonanza",
      abbrevation: "DB",
      start_date: "2017-03-03",
      records: [build(:record)]
    }
  end

  def record_factory do
    %Record{
      hours: 8,
      work_type: "Dev",
      date: "2017-03-04",
    }
  end
end