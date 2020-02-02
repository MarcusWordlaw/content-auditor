Rails.application.config.middleware.insert_before 0, Rack::Cors do
    ENV['CORS_ORIGINS'] = 'http://172.16.1.101:3000, 172.16.1.1'
    allow do 
        origins ENV['CORS_ORIGINS'].split(',').map { |origin| origin.strip }
        resource(
            '*',
            headers: :any,
            methods: [:get, :post, :patch, :put, :delete, :options, :head], credentials: true
        )
    end
end
    #Domain that you push data to
    #  allow do
    #     origins “http:localhost:3000/reactapp.com”
    #     resourc “*”, headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true