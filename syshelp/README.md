### Not getting IP even though I'm connected to router (access point, ethernet)
1. Open Windows Command Prompt and type:\
	1.1 `ipconfig /release`\
	1.2 `ipconfig /renew`
2. Make sure to disable the access point's DHCP and change it's IP to differ from the main router.\
   (eg. if the main router's IP is '192.168.0.1', you can set the access point's IP to '192.168.0.2').
3. Reset the access point's settings and disconnect it from the main router.
	3.1 Connect to the AP using the IP.

### Discord freezing when clicking links
1. Reset and repair Edge\
	1.1 Open Apps & Features\
	1.2 Find Microsoft Edge\
	1.3 Click Microsoft Edge and then click 'Advanced options'\
	1.4 Click both 'Reset' and 'Repair'
2. Clear Discord cache\
   § The name of the Discord folder may change between Discord releases.\
   § All your Discord settings will be reset.\
	2.1 Go to %appdata%\discord\Cache\ \
	2.2 Delete everything in the folder

### Installing Arch Linux
1. Don't
2. Install [PonyOS](http://www.ponyos.org/), [Hannah Montana Linux](http://hannahmontana.sourceforge.net/) or [Biebian](http://biebian.sourceforge.net/)

### Share folders from Linux(Debian) [[1](https://help.ubuntu.com/community/How%20to%20Create%20a%20Network%20Share%20Via%20Samba%20Via%20CLI%20%28Command-line%20interface/Linux%20Terminal%29%20-%20Uncomplicated,%20Simple%20and%20Brief%20Way!)]
0. *The following commands are for use in bash*
1. Install Samba\
	`sudo apt-get update`\
	`sudo apt-get install samba`
2. Set a password for your user in Samba\
	`sudo smbpasswd -a <user_name>`
3. Create a directory to be shared\
	`mkdir /home/<user_name>/<folder_name>`
4. Make a safe backup copy of the original smb.conf file to your home folder, in case you make an error\
	`sudo cp /etc/samba/smb.conf ~`
5. Edit the file '/etc/samba/smb.conf'\
	`sudo vim /etc/samba/smb.conf`\
	5.1 Once 'smb.conf' has loaded, add this to the very end of the file:
	```
	[<folder_name>]
	path = /home/<user_name>/<folder_name>
	valid users = <user_name>
	read only = no
	```
6. Restart Samba:\
	`sudo service smbd restart`
7. Once Samba has restarted, use this command to check your smb.conf for any syntax errors\
	`testparm`
* Troubleshooting:
	* Failed to start smbd.service: Unit not found.

### Mapping a network drive on windows [[1](https://www.tenforums.com/network-sharing/15059-network-credentials.html)]
| Example                 | Type          |
| ----------------------- | ------------- |
| \\\server\share         | shared folder |
| http://webserver/share  | Web Share     |
| ftp://ftp.microsoft.com | FTP site      |
1. Right click on 'This PC', click 'Add a network location'
2. Click 'Next'
3. Select 'Choose a custom network location' and click 'Next'
4. Type the shared location (eg. \\\192.168.0.24\Shared) and click 'Next'
5. Type a name for this network location
6. Click 'Next', then 'Finish'
7. If you are prompted with a login box, type PCNAME\USERNAME

### Microphone not working
1. Click the Windows Button
2. Click on/select 'All apps'
3. Scroll down and click on 'Settings'
4. In upper right search box 'i.e., Find a setting', type in 'microphone'
5. Click on/select 'Microphone privacy settings'
6. Turn on 'Let apps use my microphone'

### Can't login to osu! client
  * Type your password in cleartext and copy it, then paste it into the password field

### Markdown???
  * [Here you go](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
  * [Supported code block languages (highlight.js)](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases)

### Linux partitioning (in order)
| Size (MiB)    | Location (primary, ext4) |
| ------------- | ------------------------ |
| 512           | /boot                    |
| 30720         | /                        |
| 4096          | /swap                    |
| the rest      | /home                    |

### Removing the 'Creative Cloud Files' folder from space tree [[1](https://forums.adobe.com/thread/1870123)]
0. *You decide yourself if you want to delete the folder, this is not always recommended though.*
1. Open regedit
2. Press CTRL+F and type 'Creative Cloud Files'\
    2.1 Uncheck all checkboxes except 'Data'
3. Click 'Find Next'
4. The key 'System.IsPinnedToNameSpaceTree' should appear
5. Right click on it and click 'Modify', set the value to '0'
6. Right click the folder with the key in and click 'Permissions...'
7. Select 'SYSTEM' and click *Deny* > 'Full Control'
8. Click 'OK'

### Install Firefox Nightly on Linux/Ubuntu [[1](https://gist.github.com/brenopolanski/2a25088801b2de342200)]
1. Add the repository\
	`sudo add-apt-repository ppa:ubuntu-mozilla-daily/ppa`
2. Update package list\
	`sudo apt-get update`
3. Install Nightly\
	`sudo apt-get install firefox-trunk`

### Run Control Panel items from command [[1](https://support.microsoft.com/en-us/help/192806/how-to-run-control-panel-tools-by-typing-a-command)]
| Control panel tool            | Command                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- |
| Accessibility Options         | control access.cpl                                                        |
| Add New Hardware              | control sysdm.cpl add new hardware                                        |
| Add/Remove Programs           | control appwiz.cpl                                                        |
| Date/Time Properties          | control timedate.cpl                                                      |
| Display Properties            | control desk.cpl                                                          |
| FindFast                      | control findfast.cpl                                                      |
| Fonts Folder                  | control fonts                                                             |
| Internet Properties           | control inetcpl.cpl                                                       |
| Joystick Properties           | control joy.cpl                                                           |
| Keyboard Properties           | control main.cpl keyboard                                                 |
| Microsoft Exchange            | control mlcfg32.cpl                                                       |
| *(or Windows Messaging)*      |                                                                           |
| Microsoft Mail Post Office    | control wgpocpl.cpl                                                       |
| Modem Properties              | control modem.cpl                                                         |
| Mouse Properties              | control main.cpl                                                          |
| Multimedia Properties         | control mmsys.cpl                                                         |
| Network Properties            | control netcpl.cpl                                                        |
|                               | *NOTE: In Windows NT 4.0, Network properties is Ncpa.cpl, not Netcpl.cpl* |
| Password Properties           | control password.cpl                                                      |
| PC Card                       | control main.cpl pc card (PCMCIA)                                         |
| Power Management (Windows 95) | control main.cpl power                                                    |
| Power Management (Windows 98) | control powercfg.cpl                                                      |
| Printers Folder               | control printers                                                          |
| Regional Settings             | control intl.cpl                                                          |
| Scanners and Cameras          | control sticpl.cpl                                                        |
| Sound Properties              | control mmsys.cpl sounds                                                  |
| System Properties             | control sysdm.cpl                                                         |

### Where do I change my Google activity?
  * Go to [activitycontrols](https://myaccount.google.com/activitycontrols?utm_source=my-activity&utm_medium=home) to change activity controls
  * Go to [myactivity](https://myactivity.google.com/myactivity) to modify your Google history

### How do I change the default AutoHotkey editor?
1. Press Windows+R
2. Search *regedit* and click Enter
3. Click **Yes** on the popup that says *Do you want to allow this app to make changes to your device?*
  * The Verified Publisher of the regedit application should be *Microsoft Windows*
4. When regedit opens, enter *HKEY_CLASSES_ROOT\AutoHotkeyScript\Shell\Edit\Command* in the search bar <sup>(NOT the find box)</sup>
  * Alternatively, you can search for *AutoHotkeyScript* by clicking Ctrl+F, note that this won't always find it, or take some time.
5. Your file structure should look something like this.
  ```
  AutoHotkeyScript
  └── Shell
      └── Edit
          └── Command
  ```
6. Inside the Command folder, you should find a key named *(Default)*

| Name | Type | Data |
| - | - | - |
| (Default) | REG_SZ | "editor.exe" "%1" |

7. Double click the key
8. Under *Value Data*, change the .exe file location to your new editor
 * Eg. Change *editor.exe* to *C:\Program Files\Sublime Text 3\sublime_text.exe*
 * Note: Do not remove the quotation marks around the editor path and *%1*

### Weird crackling in headset and microphone (VBCABLE)
1. Reinstall VBCABLE.
* This can also be caused by peaking, if this is the case, read next step.
	* Lower the max volume in VoiceMeeter or playback devices.

### Terminal: Generate SSH-keypair for use with github (so you don't have to type username and password when committing)
1. Run these commands in a terminal (If you get prompted to set a passphrase, this will be the key to use your SSH-keypair. )
  ```bash
  $ cd
  $ ssh-keygen -b 2048 -t rsa
  $ cd .ssh
  $ ls -la
  ```
2. You should now see two files starting with *id_rsa*.
3. The file with the *.pub* extension is your public ssh key, this can be shared.
4. The file without an extension is your private ssh key, this should **NOT** be shared with anyone. Think of this as your password.
5. Log in to *github.com* and go to *Settings > SSH and GPG keys*.
6. Click *New SSH key*.
7. Open the terminal and copy the contents of *id_rsa.pub*. (e.g. Type *cat id_rsa.pub* and copy the output.)
8. Paste the output in the *key* box and give it a relevant title. (e.g. *git bash*)
9. When pushing, the git link needs to be in the right format.
 * **Wrong**: https://github.com/username/repo/
 * **Right**: git@github.com:username/repo.git
10. cd into your git repo and type *vim .git/config*
11. You should see a *[remote "origin"]* section with a *url* definition. This url needs to be updated to match the previous requirements.
  ```
  [remote "origin"]
	url = git@github.com:username/repo.git
  ```

### Download Windows Spotlight images locally
1. Open the *run* box by holding down the **Windows button** and clicking **r**.
2. Enter ``%localappdata%\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets`` in the box and click enter.
3. A folder with random files without extensions should pop up.
4. Copy all of the files to a folder elsewhere on your system, e.g. on the Desktop.
5. Open the folder you placed the files in in an explorer window, then type *cmd* and hit enter in the address bar.
6. You will see a command prompt window open, in this you should type ``ren *.* *.jpg``
6.1. This command will rename all the files in the folder to have a .jpg extension, which in return will let you view them.
7. If you take a look inside your folder, you might notice that some files failed to convert, but don't worry, these are just junk files and you can go ahead and delete them.

### Dual boot Linux/Windows
* grub-mkconfig -o /boot/grub/grub.cfg

### LAMP Stack ubuntu
* sudo apt-get update
* sudo apt-get upgrade
* sudo apt-get install php
* sudo apt-get install libapache2-mod-php
* sudo apt-get install apache2
* sudo apt-get install mysql-server

### Change lid behavior on linux laptop
1. `sudo vim /etc/systemd/logind.conf`
2. Remove the **#** from the line `#HandleLidSwitch=suspend` and edit **suspend** with the appropriate argument
    * `HandleLidSwitch=poweroff` to shutdown computer when lid is closed
    * `HandleLidSwitch=hibernate` to hibernate computer when lid is closed
    * `HandleLidSwitch=ignore` to do nothing
3. `sudo systemctl restart systemd-logind`

### regex [[1](https://regexone.com/lesson/introduction_abcs)][[2](https://regexr.com/)]
| Regex          | Filter                         |
| -------------- | ------------------------------ |
| ``abc…``       | Letters                        |
| ``123…``       | Digits                         |
| ``\d``         | Any Digit                      |
| ``\D``         | Any Non-digit character        |
| ``.``          | Any Character                  |
| ``\.``         | Period                         |
| ``[abc]``      | Only a, b, or c                |
| ``[^abc]``     | Not a, b, nor c                |
| ``[a-z]``      | Characters a to z              |
| ``[0-9]``      | Numbers 0 to 9                 |
| ``\w``         | Any Alphanumeric character     |
| ``\W``         | Any Non-alphanumeric character |
| ``{m}``        | m Repetitions                  |
| ``{m,n}``      | m to n Repetitions             |
| ``*``          | Zero or more repetitions       |
| ``+``          | One or more repetitions        |
| ``?``          | Optional character             |
| ``\s``         | Any Whitespace                 |
| ``\S``         | Any Non-whitespace character   |
| ``^…$``        | Starts and ends                |
| ``(…)``        | Capture Group                  |
| ``(a(bc))``    | Capture Sub-group              |
| ``(.*)``       | Capture all                    |
| ``(abc\|def)`` | Matches abc or def             |

### Java regex not working (invalid escape sequence) [[1](https://stackoverflow.com/a/34071623)]
When using regex in Java, you basically have to double the amount of escape characters in your regex.
The reason for this is because strings; let's say you're trying to test for this expression: ``\[.*\]``. This would end up as ``.*``, as the brackets were escaped in the string, hence excluding them from the regex. In order to fix this, you have to escape the escape characters themselves: ``\\[.*\\]``. If you wanted to type an escaped backslash in regex, you would have to use this: ``\\\\``.

### error: GPGME error: No data [[1](https://forum.antergos.com/topic/9645/gpgme-error-no-data/6)]
* Arch:
```bash
$ sudo pacman-key --init
$ sudo pacman-key --populate archlinux
$ sudo pacman-key --refresh-keys
```
* Antergos:
```bash
$ sudo pacman-key --init
$ sudo pacman-key --populate antergos archlinux
$ sudo pacman-key --refresh-keys
```

### Python file modes
```python
r
Opens a file for reading only. The file pointer is placed at the beginning of the file. This is the default mode.
rb
Opens a file for reading only in binary format. The file pointer is placed at the beginning of the file. This is the default mode.
r+
Opens a file for both reading and writing. The file pointer will be at the beginning of the file.
rb+
Opens a file for both reading and writing in binary format. The file pointer will be at the beginning of the file.
w
Opens a file for writing only. Overwrites the file if the file exists. If the file does not exist, creates a new file for writing.
wb
Opens a file for writing only in binary format. Overwrites the file if the file exists. If the file does not exist, creates a new file for writing.
w+
Opens a file for both writing and reading. Overwrites the existing file if the file exists. If the file does not exist, creates a new file for reading and writing.
wb+
Opens a file for both writing and reading in binary format. Overwrites the existing file if the file exists. If the file does not exist, creates a new file for reading and writing.
a
Opens a file for appending. The file pointer is at the end of the file if the file exists. That is, the file is in the append mode. If the file does not exist, it creates a new file for writing.
ab
Opens a file for appending in binary format. The file pointer is at the end of the file if the file exists. That is, the file is in the append mode. If the file does not exist, it creates a new file for writing.
a+
Opens a file for both appending and reading. The file pointer is at the end of the file if the file exists. The file opens in the append mode. If the file does not exist, it creates a new file for reading and writing.
ab+
Opens a file for both appending and reading in binary format. The file pointer is at the end of the file if the file exists. The file opens in the append mode. If the file does not exist, it creates a new file for reading and writing.
```

### root ( / ) partition full (arch/antergos) [[1](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks#Removing_unused_packages_(orphans)][[2](https://bbs.archlinux.org/viewtopic.php?id=235924)][[3](https://forum.manjaro.org/t/error-partition-too-full/35824)][[4](http://colinrrobinson.com/technology/linux/free-space-rootfs-arch-linux/)]
```bash
# These are some general commands that can help you clean up.
# This case is intended for cleanup of your root partition, though this may be useful in other cases.
# You might not want to run all of them.
# Some of these may work on other distros.

# error example:
# 	error: Partition / too full: {x} blocks needed, {y} blocks free
# 	error: failed to commit transaction (not enough free disk space)
# 	Errors occurred, no packages were upgraded.

# disk space usage
$ df -h

# remove unused dependencies / orphaned packages
$ pacman -Qdt # list orphaned packages without making any changes
$ sudo pacman -Rns $(pacman -Qtdq)

# clear pacman cache
$ pacman -Sc

# install paccache if you don't have it already
$ sudo pacman -S pacman-contrib
# Clear pacman cache, but leave last 3
$ sudo paccache -rk3
# Clear pacman cache, removes if not installed
$ sudo paccache -ruk0

# install ncdu if you don't have it already
$ sudo pacman -S ncdu
# -x in order not to cross filesystem boundaries
$ ncdu -x /

# vacuum log files, they can get large with default verbose logging config
$ sudo journalctl --vacuum-size=50M

# get blocksize of /
$ stat -fc %s /

# '+10M' == “greater than 10 megabytes”, can be made larger if needed
# '.' == starting directory, can be changed to e.g. “/”
$ cd
$ find . -size +10M -exec ls -lh {} \;

# logfiles are known to cause space problems, check the size of /var/log
$ du -h /var/log
```

### screen usage
```bash
# install screen
$ sudo apt-get install screen

# run a program / script with screen
$ screen start.sh

# detach by pressing CTRL+A CTRL+D

# reattach
$ screen -R
```

### [FAILED] Failed to start Light Display Manager
```bash
# Press CTRL+ALT+F2
$ sudo systemctl stop lightdm
$ sudo systemctl disable lightdm
# answer yes[y] to everything
$ sudo pacman -Syu lightdm lighdm-webkit2-greeter
$ sudo systemctl enable lightdm
$ sudo systemctl reboot
```