Haml::Template.options[:format] = :html5
puts "Setting Sass options"
Sass::Plugin.options[:template_location] = 'app/stylesheets'
Sass::Plugin.options[:css_location] = 'public/stylesheets'
puts Sass::Plugin.options.inspect