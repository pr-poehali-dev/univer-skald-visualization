import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Общий объём запасов', value: '12 847', unit: 'шт.', trend: '+5.2%', icon: 'Package', color: 'text-blue-600' },
    { title: 'Активных позиций', value: '487', unit: 'SKU', trend: '+12', icon: 'Layers', color: 'text-green-600' },
    { title: 'Критический уровень', value: '23', unit: 'позиции', trend: '-3', icon: 'AlertTriangle', color: 'text-orange-600' },
    { title: 'Заявок в обработке', value: '8', unit: 'шт.', trend: '+2', icon: 'ClipboardList', color: 'text-purple-600' },
  ];

  const recentActivity = [
    { action: 'Поступление', item: 'Бумага офисная А4', quantity: '+500', time: '10:45', status: 'completed' },
    { action: 'Списание', item: 'Картриджи HP LaserJet', quantity: '-12', time: '09:30', status: 'completed' },
    { action: 'Заявка', item: 'Тетради 48л', quantity: '200', time: '08:15', status: 'pending' },
    { action: 'Инвентаризация', item: 'Канцелярские товары', quantity: '---', time: 'Вчера', status: 'completed' },
  ];

  const lowStockItems = [
    { name: 'Маркеры для доски', current: 12, min: 50, category: 'Канцелярия' },
    { name: 'Бумага А3', current: 25, min: 100, category: 'Расходники' },
    { name: 'Степлеры', current: 3, min: 15, category: 'Оборудование' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-secondary text-secondary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Warehouse" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">УниверСклад</h1>
                <p className="text-sm text-muted-foreground">Система управления складскими запасами</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <Button 
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="gap-2"
              >
                <Icon name="LayoutDashboard" size={18} />
                Дашборд
              </Button>
              <Button 
                variant={activeTab === 'docs' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('docs')}
                className="gap-2"
              >
                <Icon name="FileText" size={18} />
                Документация
              </Button>
              <Button 
                variant={activeTab === 'contacts' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('contacts')}
                className="gap-2"
              >
                <Icon name="Mail" size={18} />
                Контакты
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Оперативная сводка</h2>
              <p className="text-muted-foreground">Актуальные данные на {new Date().toLocaleDateString('ru-RU')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon name={stat.icon} size={20} className={stat.color} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {stat.trend}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} className="text-primary" />
                    Последняя активность
                  </CardTitle>
                  <CardDescription>Операции за последние 24 часа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{activity.item}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {activity.action}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${activity.quantity.startsWith('+') ? 'text-green-600' : activity.quantity.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'}`}>
                              {activity.quantity}
                            </p>
                            <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs mt-1">
                              {activity.status === 'completed' ? 'Выполнено' : 'В работе'}
                            </Badge>
                          </div>
                        </div>
                        {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Icon name="AlertTriangle" size={20} />
                    Критические остатки
                  </CardTitle>
                  <CardDescription>Позиции требующие пополнения</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockItems.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Badge variant="destructive">{item.current} шт</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${(item.current / item.min) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Минимум: {item.min} шт</p>
                        {index < lowStockItems.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={20} className="text-primary" />
                  Статистика по категориям
                </CardTitle>
                <CardDescription>Распределение запасов по типам товаров</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Канцелярские товары', value: 4280, max: 5000, color: 'bg-blue-500' },
                    { category: 'Расходные материалы', value: 3650, max: 5000, color: 'bg-green-500' },
                    { category: 'Оборудование и техника', value: 2840, max: 5000, color: 'bg-purple-500' },
                    { category: 'Учебные материалы', value: 2077, max: 5000, color: 'bg-orange-500' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm font-bold">{item.value} шт</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${item.color} h-3 rounded-full transition-all`}
                          style={{ width: `${(item.value / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Документация</h2>
              <p className="text-muted-foreground">Руководства и инструкции по работе с системой</p>
            </div>

            <Tabs defaultValue="getting-started">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="getting-started">Начало работы</TabsTrigger>
                <TabsTrigger value="operations">Операции</TabsTrigger>
                <TabsTrigger value="reports">Отчёты</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              <TabsContent value="getting-started" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" size={20} className="text-primary" />
                      Введение в систему УниверСклад
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Что такое УниверСклад?</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        УниверСклад — это современная система управления складскими запасами, 
                        разработанная специально для образовательных учреждений. Система обеспечивает 
                        полный контроль над материальными активами, автоматизирует процессы учёта 
                        и помогает оптимизировать расходы.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Основные возможности</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={18} className="text-green-600 mt-0.5" />
                          <span>Учёт поступления и списания товаров</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={18} className="text-green-600 mt-0.5" />
                          <span>Автоматические уведомления о критических остатках</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={18} className="text-green-600 mt-0.5" />
                          <span>Формирование отчётов и аналитика</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={18} className="text-green-600 mt-0.5" />
                          <span>Инвентаризация и контроль перемещений</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="operations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Settings" size={20} className="text-primary" />
                      Складские операции
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Приёмка товаров</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Процесс приёмки включает регистрацию поступивших товаров, 
                        проверку соответствия накладным и размещение на складе.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Списание и выдача</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Система позволяет оформлять заявки на выдачу товаров, 
                        контролировать лимиты и автоматически обновлять остатки.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="FileBarChart" size={20} className="text-primary" />
                      Отчётность и аналитика
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Система генерирует различные виды отчётов для анализа 
                      эффективности использования складских запасов.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Code" size={20} className="text-primary" />
                      API документация
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      REST API для интеграции УниверСклад с внешними системами учёта.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-2">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами для получения поддержки или консультации</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Phone" size={32} className="text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground mt-1">Пн-Пт 9:00-18:00</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Mail" size={32} className="text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">support@universklad.ru</p>
                  <p className="text-sm text-muted-foreground mt-1">Ответ в течение 24 часов</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="MapPin" size={32} className="text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  <p className="text-sm text-muted-foreground mt-1">Офис 101</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
                <CardDescription>Заполните форму и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Спасибо! Ваше сообщение отправлено.'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Имя *
                      </label>
                      <Input id="name" placeholder="Иван Петров" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input id="email" type="email" placeholder="ivan@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Тема обращения *
                    </label>
                    <Input id="subject" placeholder="Вопрос по работе системы" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Сообщение *
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Опишите ваш вопрос или проблему..." 
                      rows={6}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Icon name="Send" size={18} />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="Info" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Техническая поддержка</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Для срочных вопросов по работе системы обращайтесь на горячую линию: 
                      <span className="font-semibold text-foreground"> 8-800-123-45-67</span> (звонок бесплатный)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 bg-secondary">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Warehouse" size={24} className="text-primary" />
              <span className="font-semibold">УниверСклад</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 УниверСклад. Система управления складскими запасами
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Github" size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;