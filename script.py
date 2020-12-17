import frida, sys


def on_message(message, data):
    if message["type"] == "send":
        print("[*] {0}".format(message["payload"]))
    else:
        print(message)


with open("./agent.js") as f:
    jscode = f.read()

process = frida.get_usb_device().attach('<your_app_id>')
script = process.create_script(jscode)
script.on("message", on_message)
print("[*] Running ANALYZE")
script.load()
sys.stdin.read()
