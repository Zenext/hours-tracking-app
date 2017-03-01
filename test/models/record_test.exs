defmodule Hours.RecordTest do
  use Hours.ModelCase

  alias Hours.Record

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Record.changeset(%Record{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Record.changeset(%Record{}, @invalid_attrs)
    refute changeset.valid?
  end
end
