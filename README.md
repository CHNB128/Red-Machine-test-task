# Red-Machine-test-task

Test task for Red Machine company 

## Задача

Разработать Node-приложение, которое взаимодействует с Redis и может как генерировать сообщения, так и принимать. Одновременно может быть запущено сколько угодно node-приложений

## Детали

* Обмен информацией между node-приложениями может быть только через Redis;
* Из всего кол-ва текущих запущенных node-приложений только одно - является генератором, остальные являются слушателями и всегда должны быть готовы принимать сообщения из Redis;
* Все сообщения должны быть обработаны только один раз и только одним слушателем;
* Генератором может быть только одно node-приложение, каждое из запущенных приложений может стать генератором;
* Если текущий генератор принудительно завершится(например, отключили из розетки), то один из слушателей(любой) должен сразу стать генератором. Для определения, кто генератор, нельзя использовать средства ОС(так же node-приложения не могут общаться друг с другом напрямую) - предположительно приложения могут общаться друг с другом находясь в разных ДЦ из разных стран;
* Сообщения генерируются раз в 500ms;
* Сообщение может быть любым(но от 80 до 100 символов);
* Слушателем с вероятностью 5% считает полученное сообщение ошибочным;
* Ошибочное сообщение нужно поместить в Redis для дальнейшего изучения;
* Если запустить приложение с параметром getErrors: оно заберет из Redis все сохраненные сообщения, выведет их на экран и завершится. При этом сами сообщения из Redis удаляются;
* Проверить, что приложение может обработать 1000000 сообщений;

## Что еще надо

* Опишите, почему вы выбрали именно такую реализацию и как еще можно было решить эту задачу?
* Опишите, как вы избегаете условий гонки в условиях взаимодействия можества Node-процессов?
