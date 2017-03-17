defmodule Hours.RecordView do
  use Hours.Web, :view

  def render("index.json", %{records: records}) do
    Enum.map(records, &record_json/1)
  end

  def render("hours.json", %{records: records}) do
    count_hours(records)
  end

  def render("show.json", %{record: record}) do
    record_json(record)
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
      date: record.date,
    }
  end

  def count_hours(records) do
    %{
      dev: count_hours(records, "Dev"),
      design: count_hours(records, "Design"),
      animations: count_hours(records, "Animations"),
      qa: count_hours(records, "QA"),
      pm: count_hours(records, "PM")
    }
  end

  def count_hours(records, type) do
    {_total, hours} = 
      records
      |> Enum.filter(fn(x) -> x.work_type == type end)
      |> Enum.map_reduce(0, fn(x, acc) -> {x.hours, x.hours + acc} end)

    hours
  end
end
