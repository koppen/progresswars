# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key    => '_progress_wars_session',
  :secret => '03cf08d5b54873cf5b0171217f09da5014571a3b99b14eb114ff55266775b71d2ecaf715ea6017fa985e3da35c27fe78973e5282737d74a1e551ddb12934a0b7'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
