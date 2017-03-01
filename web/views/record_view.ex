defmodule Hours.RecordView do
  use Hours.Web, :view

  def render("index.json", %{records: records}) do
    %{data: render_many(records, Hours.RecordView, "record.json")}
  end

  def render("show.json", %{record: record}) do
    %{data: render_one(record, Hours.RecordView, "record.json")}
  end

  def render("record.json", %{record: record}) do
    %{id: record.id,
      name: record.name}
  end
end
