defmodule Hours.RecordControllerTest do
  use Hours.ConnCase

  alias Hours.RecordView
  
  test "#index renders a list of all records" do
    conn = build_conn()
    record = insert(:record)

    conn = get conn, record_path(conn, :index)

    assert json_response(conn, 200) == render_json("index.json", records: [record])
  end

  defp render_json(template, assigns) do
    assigns = Map.new(assigns)
    
    RecordView.render(template, assigns)
      |> Poison.encode!
      |> Poison.decode!
  end
end