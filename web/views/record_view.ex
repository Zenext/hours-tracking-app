defmodule Hours.RecordView do
  use Hours.Web, :view

  def render("index.json", %{records: records}) do
    %{records: Enum.map(records, &record_json/1)}
  end

  def render("show.json", %{record: record}) do
    %{record: record_json(record)}
  end

  def record_json(record) do
    %{
      person_id: record.person_id,
      id: record.id,
      hours: record.hours,
      work_type: record.work_type,
      date: record.date
    }
  end
end
