import os
from time import sleep
import pyautogui
import pygetwindow as gw
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



