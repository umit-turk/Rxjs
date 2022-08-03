import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  asyncScheduler,
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  observeOn,
  bindCallback,
  of,
  defer,
  timer,
  empty,
  from,
  fromEvent,
  generate,
  interval,
  range,
  throwError,
  iif,
  combineLatest,
  concat,
  forkJoin,
  merge,
  partition,
  mapTo,
  race,
  zip,
  filter,
  map,
  audit,
  auditTime,
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  elementAt,
  first,
  ignoreElements,
  sample,
  single,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css'],
})
export class ObserverComponent implements OnInit, AfterViewInit {
  name: string = '';

  constructor() {
    /* console.log('3'); */
  }

  ngAfterViewInit(): void {
    //COMPONENT AYAGA KALKTIKTAN SONRA TETIKLENEN METOT
    /* console.log('2'); */
    /*   asyncScheduler.schedule(() => {
      this.name = 'Ahmet';
    }); */

    const obs = fromEvent(this.txt.nativeElement, 'keyup');
    obs.pipe(debounceTime(100)).subscribe((res) => console.log(res));
  }

  ngOnInit(): void {
    /*  this.NormalSubject() */
    /*   this.BehaviourSubject() */
    /*  this.ReplaySubject() */
    /* this.AsyncSubject() */
    /*  console.log(1); */
    /*  this.Schedule(); */
    /* this.Ajax(); */
    /*  this.Defer() */
    /*  this.Sayilar(); */
    /*  this.FromEvent(); */
    /*  this.Generate() */
    /*  this.Interval() */
    /*  this.Of() */
    /* this.Range() */
    /* this.ThrowError() */
    /* this.Timer() */
    /*  this.Iif(); */
    /* this.CombineLatest() */
    /*  this.Concat() */
    /* this.ForkJoin() */
    /*  this.Merge() */
    /*  this.Partition() */
    /*  this.Race() */
    /* this.ZİP() */
    /* this.Pipe() */
    /* this.Audit(); */
    /*  this.AuditTime() */
    /*  this.Debounce(); */
    /* this.Distinct(); */
    /*     this.DistinctUntilChanged() */
    /* this.ElementAt() */
   /*  this.Filter(); */
  /*  this.IgnoreElements() */
 /*  this.Sample() */
 this.Single()
  }

  /* Subject birden fazla observerin observablede tanımlayabiliriz */
  NormalSubject() {
    const subject = new Subject();
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    /* kaldıgı yerden devam eder */
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  BehaviourSubject() {
    let data: any = 'Umit';
    const subject = new BehaviorSubject(data);
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    /* akıstaki bir onceki data yı alır */
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  ReplaySubject() {
    /* istenldigi kadar onceki veriyi alabiliyoruz */
    /* kac tane geriden alıcaksan onceden bildir */
    const subject = new ReplaySubject(2);
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.next(7);
  }

  AsyncSubject() {
    /* akıstaki son veriyi verir */
    /* akısı complete etmen gerekiyor */
    const subject = new AsyncSubject();
    subject.subscribe((data) => {
      console.log(`ObserverA ${data}`);
    });
    subject.subscribe((data) => {
      console.log(`ObserverB ${data}`);
    });
    subject.next(3);
    subject.next(4);
    subject.next(5);
    subject.next(7);
    subject.subscribe((data) => {
      console.log(`ObserverC ${data}`);
    });
    subject.complete();
  }

  /* Schedule */
  /* zamanlayıcı gorevi gorur */

  Schedule() {
    console.log('Schedular kullanılmayan ****');
    const observable = new Observable((data) => {
      data.next(1);
      data.next(3);
      data.next(5);
      data.complete();
    });

    observable.subscribe((data) => console.log(data));
    console.log('schedular kullanılmayan');
    console.log('*********************');

    console.log('schedular kullanılan*******');
    const observable2 = new Observable((data) => {
      data.next(1);
      data.next(2);
      data.next(3);
      data.complete();
    }).pipe(observeOn(asyncScheduler));
    observable2.subscribe((data) => console.log(data));

    console.log('schedular kullanılan*******');
  }

  /* Operatorler */
  /* Rxjs olay ve veri kaynaklarını abone olunabilir(subscribe) nesnelere (observable) donusturup bunlar uzerinden oparetorler vasıtasıyla donusumler ve etkiler gerceklestirilir.*/

  /* ajax */
  Ajax() {
    ajax
      .getJSON('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => console.log(data));

    ajax('https://jsonplaceholder.typicode.com/posts').subscribe((data) =>
      console.log(data)
    );

    ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
    });
  }

  /* bindCallback */

  /* defer operatoru */

  Defer() {
    //of observable olusturur
    const obs1 = of(new Date());

    /* defer subscribe oldugum anda olusturulur */
    const obs2 = defer(() => of(new Date()));

    timer(5000).subscribe(() => {
      obs1.subscribe((data) => console.log(data));
      obs2.subscribe(function (data) {
        console.log(data);
      });
    });
  }

  /* empty */
  /* bos bir observable nesnesi doner */

  /* from */
  /* herhangi bir diziyi alıp geriye observable donduren bir operator */

  Sayilar() {
    const sayilar = [5, 10, 15];
    const obs = from(sayilar);
    obs.subscribe((data) => console.log(data));

    const araclar = new Map<string, number>();
    araclar.set('Klavye', 1);
    araclar.set('Mouse', 2);
    araclar.set('Monitor', 3);
    const obs2 = from(araclar);
    obs2.subscribe((data) => console.log(data));
  }

  /* fromEvent */

  FromEvent() {
    const button = document.getElementsByTagName('button')[0];
    /* const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
      console.log('tiklandı');
    }); */

    const obs = fromEvent(button, 'click');
    obs.subscribe((e) => console.log(e));
  }

  /* generate */
  /* verilen şarta göre döngü oluşturarak Observable donduren bir operator */
  Generate() {
    let obs = generate(
      100,
      (x) => x > 0,
      (x) => x - 3
    );
    obs.subscribe((data) => console.log(data));
  }

  /* Interval */
  Interval() {
    const obs = interval(5000);
    obs.subscribe((data) => console.log(data, 'merhaba'));
  }

  /* of */
  /* verilen herhangi bir turden degerleri observable nesnesine donusturur */
  Of() {
    let obs = of(1, 2, 3);
    obs.subscribe((res) => console.log(res));
  }

  /* range */
  /* belirli bir aralıkta dizisel deger yayan obseevable nesnesidir */
  Range() {
    const obs = range(555, 50);
    obs.subscribe((data) => console.log(data));
  }

  ThrowError() {
    const obs = throwError(new Error('Ornek bir hata'));
    obs.subscribe((data) => console.log(data));
  }

  /* timer */
  /* milisaniye cinsinden belirtilen süre kadar sonra akışı yayacak olan observable nesnesi dondurur */
  Timer() {
    const obs = timer(3000, 250);
    obs.subscribe((data) => console.log(data));
  }

  /* iif */
  /* iki observale arasında şarta bağlı seçim yapar */
  Iif() {
    let state: boolean = true;
    const obs = iif(() => state, of(3, 5, 7), of(10, 11, 12));
    obs.subscribe((data) => console.log(data));
    state = false;
    obs.subscribe((data) => console.log(data));
  }

  /* Join Creation Operators */
  /* birden fazla observable nesnesi varsa bunları harmanlayarak kullanıyoruz */

  /* combineLaters */
  /* verilen tüm observablelerin akıştaki en sonuncu değerini yakalar */

  CombineLatest() {
    const obs1 = timer(1500, 1000);
    const obs2 = of(5, 10, 15);
    const obs3 = of(1, 2, 3);
    const combine = combineLatest(obs1, obs2, obs3);
    combine.subscribe((res) => console.log(res));
  }

  /* concat */
  /* bu operator birden fazla observabeleri yayan ve tek bir obseevable olusturur */
  Concat() {
    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6);
    const obs3 = of(7, 8, 9);
    const obs4 = concat(obs1, obs2, obs3);
    obs4.subscribe((res) => console.log(res));
  }

  /* forkJoin */
  /* kendisine verilen birden fazla observablenin once tamamlanmasını bekler ardından yayınlanan en son degerleri toplar ve bize array dondurur*/
  ForkJoin() {
    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6);
    const obs3 = of(7, 8, 9);
    const obs4 = forkJoin(obs1, obs2, obs3);
    obs4.subscribe((res) => console.log(res));
  }
  /* merge */
  /* bu operator sayesinde elimizdeki observableri birlestirir tek bir observable verir */
  Merge() {
    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6);
    const obs3 = of(7, 8, 9);
    const obs4 = merge(obs1, obs2, obs3);
    obs4.subscribe((res) => console.log(res));
  }

  /* partition */
  /* elimizdeki herhangi bir observable nesnesini şarta göre karsılayanlar ve karsılamayanlar olmak üzere üretir */
  Partition() {
    const obs1 = of(1, 2, 3, 4, 5, 6, 7);
    const [obs2, obs3] = partition(obs1, (x) => x % 3 == 0);
    obs2.subscribe((data) => console.log(data + 'sarta uyan'));
    obs3.subscribe((data) => console.log(data, 'sarta uymayan'));
  }
  /* race */
  /*elimizde birden fazla obnservable nesnesi varsa ve ilk subsribe olmamızı istediğimiz nesneye subsribe olur  */
  Race() {
    const obs1 = interval(1000).pipe(mapTo('Ahmet'));
    const obs2 = interval(150).pipe(mapTo('Mehmet'));
    const obs3 = interval(2000).pipe(mapTo('Hilmi'));
    race(obs1, obs2, obs3).subscribe((data) => console.log(data));
  }
  /*zip*/
  /* birden fazla observable nesnelerinden yayındaki dataları dizi olarak dondurur */
  ZİP() {
    const obs1 = of(1, 2, 3);
    const obs2 = of(4, 5, 6);
    const obs3 = of(7, 8, 9);
    zip(obs1, obs2, obs3).subscribe((res) => console.log(res));
  }
  /* pipe fonksiyonu */
  /* Kod içerisinde yaygın olarak kullanılan birden fazla operator dizisi varsa pipe fonksiyonu kullanılır */

  Pipe() {
    const obs1 = of(1, 2, 3, 4, 5, 5634, 2, 543, 342, 67, 12, 77);
    obs1
      .pipe(
        filter((x) => x % 3 == 0),
        map((x) => x + 'degeri')
      )
      .subscribe((res) => console.log(res));
  }

  /*Filtering Operators  */

  /* audit */
  /* bir süricin obseler üzerinde işlem yapıp en sonuncu degeri dondurur */
  Audit() {
    const obs = interval(1000);
    const obs2 = obs.pipe(
      audit((x) => interval(2000)),
      map((x) => x + 'degeri')
    );
    obs2.subscribe((res) => console.log(res));
  }

  /*auditTime  */
  /* ne kadar süre beklemesini istiyorsak parametre olarak veriyoruz */
  AuditTime() {
    const obs = interval(1000);
    const obs2 = obs.pipe(
      auditTime(2000),
      map((x) => x + 'degeri')
    );
    obs2.subscribe((res) => console.log(res));
  }

  /* debounce */
  /* akıştaki değerlerin zaman aşımı süresini belirleyebilmek için kullanılan bir operatör */
  @ViewChild('txt')
  txt!: ElementRef;

  Debounce() {
    const obs = fromEvent(document, 'click');
    obs
      .pipe(debounce((x) => interval(250)))
      .subscribe((res) => console.log('tiklandı'));
  }

  /* debounceTime */

  /* distinct */
  /* akıştaki verilerden tekrar edenleri tekil olarak döndüren operatördür.*/
  Distinct() {
    const obs = of(12, 34, 312, 4, 12, 4, 5, 32, 5, 6, 23, 23, 4, 123, 43);
    obs.pipe(distinct((x) => x)).subscribe((res) => console.log(res));
  }

  /* distinctUntilChanged */
  /* akıştaki verileri degisiklik olana kadar tekilleştiren operatör */
  DistinctUntilChanged() {
    const obs = of(1, 1, 2, 2, 2, 11, 3, 3, 4);
    obs.subscribe((res) => console.log(res));
  }
  /* distinctUntilKeyChanged */
  /* Akıştaki objelerden verilen key'e değişiklik olana kadar tekilleştiren operatör */

  /* elementAt */
  /* akıştaki verilerden index numarası döndüren operatör */
  ElementAt() {
    const obs = of(1, 2, 3, 4);
    obs.pipe(elementAt(2)).subscribe((res) => console.log(res));
  }

  /* filter */
  /* observabledeki verileri belirli koşula göre filtreler */
  Filter() {
    const obs = of(1, 2, 3, 4, 5, 6, 7);
    obs.pipe(filter((x) => x % 2 == 0)).subscribe((res) => console.log(res));
  }

  /* first */
  /* observabledeki ilk değeri getirir */
  First() {
    const obs = of(1, 2, 3);
    obs.pipe(first()).subscribe((res) => console.log(res));
  }

  /* ignoreElements */
  /* akışın sonlanmasına odaklanacağımız operator yalnızca complete ve error çıktılarını yakalarız */
  /* akışın sonucuna odaklanacaksan */
  IgnoreElements() {
    const obs = of(1, 2, 3);
    obs.pipe(ignoreElements()).subscribe({
      error:error => console.log(error),
      complete:() => console.log("akış bitti")

    })
  }

  /* last */
  /* observabledeki sonuncu değeri yakalar */

  /* sample */
  /* periyodik zaman aralıkları içinde bir observable tarafından yayılan en son öğeyi yayınlar */

  Sample(){
   const seconds = interval(1000);
   const obs = fromEvent(document,"click");
   const result = seconds.pipe(sample(obs));
   result.subscribe(data => console.log(data)
   );
  }

  /* sampleTime */
  /* samplenin parametrik halidir */

  /* single */
  /* bir şart operatörüdür bildirilen şarta uygun birden fazla değer söz konusuysa hata verecek yahut undefined dönecektir */
  Single(){
    const obs = range(1,10).pipe(single(x => x > 9)).subscribe({
      next: data => console.log(data),
      error:error => console.log(error)


    })
  }

}
