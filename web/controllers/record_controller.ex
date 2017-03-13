defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.{Record, Game}

  import Record
  import Hours.TimexHelpers, only: [to_db_format: 1]

  def index(conn, %{"game_id" => game_id}) do
    records = Record.get_all(game_id)    
    
    render(conn, "index.json", records: records)
  end

  def hours(conn, %{"game_id" => game_id, "start_date" => start_date, "end_date" => end_date}) do
    game = Repo.get(Game, game_id)
    records = Record.get_by_time_interval(game_id, start_date, end_date)
    hours = count_hours(records)

    render(conn, "show.json", hours: hours, game: game)
  end

  def hours(conn, %{"game_id" => game_id}) do
    game = Repo.get(Game, game_id)
    records = Record.get_all(game_id)
    hours = count_hours(records)

    render(conn, "show.json", hours: hours, game: game)
  end
  
  def create(conn, params) do
    date = to_db_format(params["date"])
    changeset = Record.changeset(%Record{}, %{params | "date" => date})

    case Repo.insert(changeset) do
      {:ok, record} ->
        conn
        |> put_status(:created)
        |> render("show.json", record: record)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

  defp count_hours(records) do
    %{
      dev: count_hours(records, "Dev"),
      art: count_hours(records, "Art"),
      qa: count_hours(records, "QA"),
      pm: count_hours(records, "PM")
    }
  end

  defp count_hours(records, type) do
    {_total, hours} = 
      records
      |> Enum.filter(fn(x) -> x.work_type == type end)
      |> Enum.map_reduce(0, fn(x, acc) -> {x.hours, x.hours + acc} end)

    hours
  end
end
