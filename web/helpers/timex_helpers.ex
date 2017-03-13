defmodule Hours.TimexHelpers do
  use Timex

  def to_db_format(date) do
    {:ok, date} = Timex.parse(date, "{0D}/{0M}/{YYYY}")
    {:ok, date} = Ecto.Date.cast date

    date
  end

  def to_user_format(date) do
    {:ok, date} = Timex.format(date, "{0D}/{0M}/{YYYY}")
    date
  end
end