defmodule Hours.RecordViewTest do
  use Hours.ModelCase
  import Hours.Factory
  alias Hours.RecordView

  test "index.json" do
    record = insert(:record)
    rendered_records = RecordView.render("index.json", %{records: [record]})

    assert rendered_records == %{
      records: [RecordView.record_json(record)]
    }
  end

  test "show.json" do
    record = insert(:record)
    rendered_record = RecordView.render("show.json", %{record: record})

    assert rendered_record == %{
      record: RecordView.record_json(record)
    }
  end

  test "hours.json" do
    record = insert(:record)
    rendered_record = RecordView.render("hours.json", %{records: [record]})

    assert rendered_record == %{
      records: [RecordView.record_json(record)],
      hours: RecordView.count_hours([record])
    }
  end
end