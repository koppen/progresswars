# if Rails.env.production?
  puts "Loading hassle"
  Rails::Application.middleware.use Hassle
# end