[![Quarto Publish](https://github.com/vanHeemstraSystems/automation-management/actions/workflows/publish.yml/badge.svg)](https://github.com/vanHeemstraSystems/automation-management/actions/workflows/publish.yml)

automation-management
# Automation Management

A template for a microservice backend.

Can be read as "Automation Management" at https://app.gitbook.com/s/gcSZDMmHamsY3z0LQpOF/

Can be browsed as "Automation Management" at https://vanheemstrasystems.github.io/automation-management/

Documentation of this repository is automatically done with Quarto using GitHub Actions as described at https://github.com/vanHeemstraSystems/quarto-to-github-pages/blob/main/300/300/README.md

This is related to the template for the microservice frontend at https://github.com/vanHeemstraSystems/automation-management-gui/

Based on "Awesome Quarto" at https://github.com/mcanouil/awesome-quarto

Based on "Quarto Web" at https://github.com/quarto-dev/quarto-web and https://quarto.org/

Based on "Creating your personal website using Quarto" at https://ucsb-meds.github.io/creating-quarto-websites/

Based on "Home Assistant" at https://github.com/vanHeemstraSystems/home-assistant/

Based on "Home Assistant - Custom React Dashboard" at https://www.youtube.com/playlist?list=PLx2XQ2lsgvPqNjx3HeWptHukw3LTrxic1

Based on "Home Assistant - Custom React Dashboard (Source Code Part 1 of 2" at https://github.com/shannonhochkins/react-home-assistant-dashboard-tutorials/tree/master/part-1

Based on "Home Assistant - Custom React Dashboard (Source Code Part 2 of 2)" at https://github.com/shannonhochkins/react-home-assistant-dashboard-tutorials/tree/master/part-2

Based on "Home Assistant React Dashboard" at https://github.com/shannonhochkins/ha-dashboard

Based on "Virtual Components for Home Assistant" at https://github.com/twrecked/hass-virtual

Based on "How to Install HACS on Home Assistant" at https://www.wundertech.net/how-to-install-hacs-on-home-assistant/

Based on "How to install & use Home Assistant Community Store (HACS) | TUTORIAL" at https://peyanski.com/how-to-install-home-assistant-community-store-hacs/

Based on "Using Wget With A Proxy" at https://www.scrapingbee.com/blog/wget-proxy/

Run as follows (in development):

```
$ cd containers/app
$ docker-compose --file docker-compose.dev.yml --project-name automation-management-dev up --build -d
```

Now in Development, "Home Assistant" can be reached by browsing from a VDI to http://IP_OF_CONTAINER_HOST:PORT_NUMBER/onboarding.html where your *Port Number* is set in your ```docker-compose.dev.yml``` file within the ```home-assistant``` service.

First time, you will be prompted to create an account as follows (as documented at https://www.home-assistant.io/getting-started/onboarding/):

- Name: **Admin**

- Username: **admin**

- Password: **secret**

- Confirm Password: **secret**

On next login, use above credentials.

**Note**: If when saving your new account the browser does not open the next page, reload the page in the browser *manually*.

Once the Home Assistant container is running and you are able to access it inside with bash, execute the following to install Home Assistant Community Store (HACS) which is required to create virtual components (such as a virtual switch) for testing the Home Assistant dashboard.

```
$ export http_proxy=http://'[Proxy_User][Proxy_Password]'@[Proxy_Server]:[Proxy_Port]
$ export https_proxy=$http_proxy
$ export ftp_proxy=$http_proxy
$ export no_proxy=localhost
$ export use_proxy=yes
```

Notice that we use single quotes around the proxy user and password to escape any offending characters (such as a parenthesis). 

Also notice that we use underscores ('_') instead of dashes ('-') and lower-case only.

Check if your exports are successful as follows:

```
$ echo $http_proxy
$ echo $https_proxy
$ echo $ftp_proxy
$ echo $no_proxy
$ echo $use_proxy
```

Next run the following, which will now use the credentials set for the proxy:

```
$ wget -O - https://get.hacs.xyz | bash -
```

If above fails, try instead:

```
$ wget -O - https://raw.githubusercontent.com/hacs/get/main/get | bash -
```

If you get a warning "Resource temporarily unavailable", the solution for your problem is installing wget via ```apk add wget``` and (if no longer needed) removing it afterwards. The busybox wget, which comes with alpine by default, cannot handle (https) proxies.

This will download the HACS script and install HACS in Home Assistant. Restart Home Assistant for the changes to be applied. In the left-hand side menu you should now see the HACS icon.

If downloading HACS as described above still fails, download the zipped directory "**hacs.zip**" manually from https://github.com/hacs/integration/releases/tag/1.32.1 (check latest version) and make sure it is the zipped directory. Copy the downloaded zipped ```hacs.zip``` to the folder ```containers/app/home-assistant/config/custom_components/``` WITHOUT unzipping it (!) as described here https://github.com/claytonjn/hacs/blob/master/docs/installation/manual.md Home Assistant will unzip it automatically on first startup.

Note: we have already added a copy of ```hacs``` here, but it may be outdated!

**Tip**: Inside Home Assistant click on your username (e.g. Admin) in the left-hand menu, and make sure that **Advanced Mode** is turned **On**.
