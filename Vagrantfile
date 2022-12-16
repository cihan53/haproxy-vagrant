n = 2


Vagrant.configure("2") do |config|

    if Vagrant::Util::Platform.windows? then
      def running_in_admin_mode?
        (`reg query HKU\\S-1-5-19 2>&1` =~ /ERROR/).nil?
      end

      unless running_in_admin_mode?
        puts "This vagrant makes use of SymLinks to the host. On Windows, Administrative privileges are required to create symlinks (mklink.exe). Try again from an Administrative command prompt."
        exit 1
      end
    end

  config.vm.define "loadbalancer" do |loadbalancer|
   # machine name (for VirtualBox UI)
    #loadbalancer.vm.name = "loadbalancer"
    loadbalancer.vm.box = 'ubuntu/bionic64'
    loadbalancer.vm.hostname = "loadbalancer"
    loadbalancer.vm.network :private_network, ip: "192.168.10.10"
    loadbalancer.vm.network "forwarded_port", guest: 80, host: 3000
    loadbalancer.vm.network "forwarded_port", guest: 8404, host: 8404
  end

  n.times do |i|


    config.vm.define "app-#{i+1}" do |app|

       app.vm.provider "virtualbox" do |v|
              v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
       end

      app.vm.box = 'jandir/nodejs'
      app.vm.hostname = "app-#{i+1}"
      #app.vm.name = "app-#{i+1}"
      app.vm.network :private_network, ip: "192.168.10.#{10+i+1}"
      #app.vm.synced_folder './app', '/app', owner: 'vagrant', group: 'vagrant' , mount_options: ["dmode=777", "fmode=777"]
      app.vm.synced_folder './app', '/app', type: "rsync",rsync_auto: true, rsync__exclude: [".git/","node_modules/"], rsync__args: ["--verbose", "--archive", "--delete", "-z"]
      # disable folder '/vagrant' (guest machine)
      app.vm.synced_folder '.', '/vagrant', disabled: true

    end
  end
end
