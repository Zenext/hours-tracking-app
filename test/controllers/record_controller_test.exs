defmodule Hours.RecordControllerTest do
  use Hours.ConnCase

  alias Hours.Record
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, record_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    record = Repo.insert! %Record{}
    conn = get conn, record_path(conn, :show, record)
    assert json_response(conn, 200)["data"] == %{"id" => record.id,
      "name" => record.name}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, record_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, record_path(conn, :create), record: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Record, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, record_path(conn, :create), record: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    record = Repo.insert! %Record{}
    conn = put conn, record_path(conn, :update, record), record: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Record, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    record = Repo.insert! %Record{}
    conn = put conn, record_path(conn, :update, record), record: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    record = Repo.insert! %Record{}
    conn = delete conn, record_path(conn, :delete, record)
    assert response(conn, 204)
    refute Repo.get(Record, record.id)
  end
end
