defmodule Hours.RecordController do
  use Hours.Web, :controller

  alias Hours.Record

  def index(conn, params) do
    render conn, "index.json"
  end

  end
