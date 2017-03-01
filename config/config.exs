# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :hours,
  ecto_repos: [Hours.Repo]

# Configures the endpoint
config :hours, Hours.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ZKlAGbHpJpUkKZG45BEDG6JZf58nFC0QGbA7OzCY4TsYWZ7L4vCQ/qAWByFr981t",
  render_errors: [view: Hours.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Hours.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
