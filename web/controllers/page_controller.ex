defmodule Hours.PageController do
  use Hours.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end