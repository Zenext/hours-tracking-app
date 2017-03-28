defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.{Record, QueryFilter, TimexHelpers}
  
  import Hours.TimexHelpers, only: [to_date: 1]

  def index(conn,  params) do
    if params["date"] != nil do
      params = %{params | "date" => TimexHelpers.to_date(params["date"])}
    end
    
    records = 
      Record
      |> QueryFilter.filter(%Record{}, params, [:game_id, :person_id, :work_type, :date])
      |> Record.preload_all
      |> Record.newest_first
      |> Repo.all

    render(conn, "index.json", records: records)
  end

  def hours(conn, %{"game_id" => game_id, "person_id" => person_id, "start_date" => start_date, "end_date" => end_date}) do
    records = Record
      |> Record.by_game_id(game_id)
      |> Record.by_person_id(person_id)
      |> Record.by_time_interval(start_date, end_date)
      |> Repo.all

    render(conn, "hours.json",  records: records)
  end

  def hours(conn, %{"game_id" => game_id, "start_date" => start_date, "end_date" => end_date}) do
    records = Record
      |> Record.by_game_id(game_id)
      |> Record.by_time_interval(start_date, end_date)
      |> Repo.all

    render(conn, "hours.json",  records: records)
  end

  def hours(conn, %{"game_id" => game_id}) do
    records = Record
      |> Record.by_game_id(game_id)
      |> Repo.all
    
    render(conn, "hours.json", records: records)
  end
  
  def create(conn, params) do
    date = to_date(params["date"])
    changeset = Record.changeset(%Record{}, %{params | "date" => date})

    case Repo.insert(changeset) do
      {:ok, record} ->
        record = Repo.preload(record, [:game, :person])
          
        conn
        |> put_status(:created)
        |> render("show.json", record: record)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    game = Repo.get!(Record, id)
    
    case Repo.delete(game) do
      {:ok, record} ->
        record = Repo.preload(record, [:game, :person])
        
        conn
        |> put_status(200)
        |> render("show.json", record: record)
      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

end
