# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box_check_update = false
  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # config.vm.define "test" do |test|
  #   test.vm.box = "bento/ubuntu-19.10"
  #   test.vm.box_version = "201912.14.0"
  #   test.vm.hostname = "test"
  #   test.vm.provider "virtualbox" do |v|
  #     v.linked_clone = true
  #     v.memory = 4096
  #     v.cpus = 2
  #   end
    

  #   test.vm.network "private_network", ip: "172.16.1.103"
  #   test.vm.provision "shell", run: 'always', inline: <<-EOS

  #   apt-get install -y npm
  #   npm install -g ganache-cli
  #   ganache-cli --host 0.0.0.0

  #   EOS
  # end

  config.vm.define "hyperledger" do |hyperledger|
    hyperledger.vm.box = "bento/ubuntu-19.10"
    hyperledger.vm.box_version = "201912.14.0"
    hyperledger.vm.hostname = "hyperledger"
    hyperledger.vm.provider "virtualbox" do |v|
      v.linked_clone = true
      v.memory = 4096
      v.cpus = 2
    end
    

    hyperledger.vm.network "private_network", ip: "172.16.1.102"
    hyperledger.vm.provision "shell", run: 'always', inline: <<-EOS

    cd /vagrant/hyperledger-besu
    rm -R .quickstart.lock
    apt install -y docker.io
    systemctl start docker
    curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ./run.sh
      
    EOS
  end

  config.vm.define "api", primary: true do |api|
    api.vm.box = "bento/ubuntu-19.10"
    api.vm.box_version = "201912.14.0"
    api.vm.hostname = "api"
    api.vm.provider "virtualbox" do |v|
      v.linked_clone = true
      v.memory = 4096
      v.cpus = 2
    end
    
    api.vm.network "private_network", ip: "172.16.1.100"
    api.vm.provision "shell", inline: <<-EOS

      apt-get install -y ruby2.5-dev
      apt-get install -y build-essential patch zlib1g-dev liblzma-dev
      apt-get install -y npm
      apt-get install -y postgresql
      apt-get install -y libpq-dev

      gem install rails
      gem install pg -v '1.2.0'
      gem install bundler

      cd /vagrant/content-auditor-backend/
      cp pg_hba.conf /etc/postgresql/11/main/pg_hba.conf
      sudo -u vagrant bundle
      systemctl start postgresql
      sudo -u postgres createuser -s provenance-tracker
      systemctl restart postgresql
      sudo -u vagrant rails db:create
      sudo -u vagrant rails db:migrate
      sudo -u vagrant rails db:seed
      sudo -u vagrant rails s > /dev/null &

      
    EOS
  end

  config.vm.define "user_interface" do |user_interface|
    user_interface.vm.box = "bento/ubuntu-19.10"
    user_interface.vm.box_version = "201912.14.0"
    user_interface.vm.hostname = "userinterface"
    user_interface.vm.provider "virtualbox" do |v|
      v.linked_clone = true
      v.memory = 4096
      v.cpus = 2
    end
    

    user_interface.vm.network "private_network", ip: "172.16.1.101"
    user_interface.vm.provision "shell", inline: <<-EOS

      apt-get install -y npm
      npm install -g yarn
      npm install pm2 -g
      npm i -g --unsafe-perm=true --allow-root truffle
      cd /vagrant/content-auditor-frontend
      yarn --ignore-optional 
      yarn add @truffle/hdwallet-provider
      truffle compile
      # Hyperledger Blockchain migration (Not to be uncommented)
      truffle migrate --network quickstartWallet --reset --compile-all
      # Ganache Test Blockchain migration (Not to be uncommented)
      # truffle migrate --network development --reset --compile-all
      cd client/
      yarn add react-scripts
      yarn --ignore-optional 
      . $HOME/.bashrc
      pm2 start node_modules/react-scripts/scripts/start.js

      
    EOS

  end

end