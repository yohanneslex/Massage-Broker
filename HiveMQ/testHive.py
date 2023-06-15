import paho.mqtt.client as mqtt
import ssl

def on_message(client, userdata, message):
    print('%s : %s' % (message.topic, message.payload.decode()))

ssl_settings = ssl.create_default_context()
ssl_settings.check_hostname = False
ssl_settings.verify_mode = ssl.CERT_NONE

client = mqtt.Client()
client.on_message = on_message

auth = {'username': 'hivemq.webclient.1684706247156', 'password': '90ca%6bnr$JgA#KR1@GZ'}
client.username_pw_set(auth['username'], auth['password'])

broker = '7627b95df14846238e22c0b6f6cccbda.s2.eu.hivemq.cloud'
port = 8883

client.tls_set_context(ssl_settings)
client.connect(broker, port=port)
client.subscribe('#')

client.loop_forever()