defmodule Hours.RecordView do
  use Hours.Web, :view

  import Hours.GameView, only: [game_json: 1]

  def render("index.json", %{records: records}) do
    %{records: Enum.map(records, &record_json/1)}
  end
  
  def render("show.json", %{hours: hours, game: game}) do
    %{hours: hours, game: game_json(game)}
  end

  def render("show.json", %{record: record}) do
    %{record: record_json(record)}
  end
  
  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, detail)
    end)

    %{errors: errors}
  end

  def record_json(record) do
    %{
      id: record.id,
      hours: record.hours,
      work_type: record.work_type,
      date: record.date
    }
  end
end
