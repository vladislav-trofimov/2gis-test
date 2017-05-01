import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
declare var $;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private showToggle:boolean = false;
  private tasks:any;
  constructor(private dataService:DataService) { }

  showData(){
      this.showToggle = !this.showToggle;
      this.dataService.getData()
          .subscribe(
              (data:any)=>{
                  console.log(data);
                  this.tasks = data;
              }
          );
      console.log(this.showToggle);
      return this.showToggle;
  }

    addTask(taskName, dateStart, dateFinish){
        this.dataService.sendData({taskName:taskName, dateStart:dateStart, dateFinish:dateFinish })
            .subscribe(
                data=>console.log(data)
            );
    }

    showTasks(){
        this.dataService.getTaskList()
            .subscribe(
                data=>console.log(data)
            );
    }

  ngOnInit() {

      $( "#dateStart, #dateFinish" ).datepicker({
          dayNamesMin: [ "Вс","Пон", "Вт", "Ср", "Чт", "Пт", "Сб"], firstDay: 1,
          monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
          dateFormat: "yy-mm-dd"
      });




  }
}
