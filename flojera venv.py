import os
from time import sleep
import pyautogui
import pygetwindow as gw
import subprocess

os.system("start /B start cmd.exe")
sleep(0.5)
foo = gw.getWindowsWithTitle('C:\\Windows\\system32\\cmd.exe')[0]
foo.activate()
pyautogui.write("cd ./backend/venv/Scripts")
pyautogui.press("enter")

pyautogui.write("activate")
pyautogui.press("enter")

pyautogui.write("cd ../../src")
pyautogui.press("enter")

pyautogui.write("python -m app")
pyautogui.press("enter")

subprocess.Popen("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")
sleep(1)
foo = gw.getWindowsWithTitle('Nueva pestaña')[0]
foo.activate()
pyautogui.write("127.0.0.1:5000")
pyautogui.press("enter")