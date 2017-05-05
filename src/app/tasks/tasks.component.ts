import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
declare let $;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private showToggle:boolean = false;
  private employee:any;
  //private employerList:any=[];
  private addEmployee:Array<string>=[];
  constructor(private dataService:DataService) { }

  showEmployee(){
      this.showToggle = !this.showToggle;
      this.dataService.getData()
          .subscribe(
              (data:any)=>{
                  console.log(data);
                  this.employee = data;
              }
          );
      console.log(this.showToggle);
      return this.showToggle;
  }

    addTask(taskName, dateStart, dateFinish){
        this.dataService.sendData({
          taskName:taskName,
          dateStart:dateStart,
          dateFinish:dateFinish,
          reasponsiblePersons:this.addEmployee })
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

  onChange(user) {
    console.log(user);
    let ind =  this.addEmployee.indexOf(user);
    console.log('ind: '+ ind);
    if (ind < 0){
      this.addEmployee.push(user);
      return;
    }
    if (this.addEmployee.includes(user)){
      this.addEmployee.splice(ind,1);
      console.log(ind);
    }
  }

  ngOnInit() {
    console.log('---');
    this.dataService.getData()
      .subscribe(
        (data:any)=>{
          this.employee = data;
          // for( let i=0; i<this.employee.length; i++){
          //   this.employerList.push(this.employee[i].name);
          // }
          // console.log(this.employerList);
        }
      );



      $( "#dateStart, #dateFinish" ).datepicker({
          dayNamesMin: [ "Вс","Пон", "Вт", "Ср", "Чт", "Пт", "Сб"], firstDay: 1,
          monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
          dateFormat: "yy-mm-dd"
      });




  }
}
