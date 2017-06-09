import {Component, OnInit, Renderer, ElementRef} from '@angular/core';
import {DataService} from "../data.service";
import {StatusService} from "../auth/status.service";
declare let $;
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  private currentStatus:boolean = false;
  private currentUser:string = '';
  private modal:any = {};
  private editTask:any = {};
  private showToggle:boolean = false;
  private employee:any;
  private adminStatus:boolean = false;
  private tasks:any=[];
  private addEmployee:Array<string> = [];
  private comments:any={};
  private commentsWindow:any={};
  private sendButton:any={};
  private checkListener = false;
  private visibleControl:any = {
    tasks:false,
    newTask:false,
    newUser:false
  };
  listenFunc: Function;
  constructor(private dataService:DataService, elementRef:ElementRef, renderer:Renderer, private statusService:StatusService) {
    this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', (event) => {
      console.log(event.target.nodeName+'  :  target');
      if(event.target.nodeName !='INPUT'){
        event.preventDefault();
      }
      let target = event.target || '';
      if (target.attributes.href){
        console.log(target.attributes.href.nodeValue);
        this.updateTask(target.attributes.href.nodeValue);
      }
    });
    //
  }

  ngAfterViewInit(){
    this.modal = document.getElementById('modal');
    this.modal.style.visibility = 'hidden';
    this.comments = document.getElementById('comments');
    this.commentsWindow = document.getElementById('commentsWindow');
    this.sendButton = document.getElementById('sendBtn');
    this.comments.style.visibility = 'hidden';
  }

  toggleMenu(param){
    for (let prop in this.visibleControl){
      if (this.visibleControl.hasOwnProperty(prop)){
        this.visibleControl[prop] = false;
      }
    }
    if (param == 'newTask') this.visibleControl.newTask = true;
    if (param == 'newUser') this.visibleControl.newUser = true;
    if (param == 'tasks') this.visibleControl.tasks = true;
  }


  updateTask(taskId){
    this.addEmployee.length = 0;
    console.log('operate task id: '+taskId);
    let ind = taskId.indexOf('del');
    if (ind<0){
      this.tasks.forEach((el)=> {
        if (el._id == taskId){
          this.editTask = el;
        }
      });
      this.modal.style.visibility = 'visible';
      //
    } else{
      console.log('status edit');
      taskId = taskId.slice(3);
      console.log(taskId);
      this.dataService.updateStatus({id:taskId})
        .subscribe(
          (data:any)=>{
            console.log(data);
            this.employee = data;
          }
        );
    }
  }

  showEmployee(){
      this.showToggle = !this.showToggle;
      this.dataService.getEmployeeList()
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
    this.dataService.sendTaskData({
      taskName:taskName,
      dateStart:dateStart,
      dateFinish:dateFinish,
      reasponsiblePersons:this.addEmployee })
      .subscribe(
        data=>console.log(data)
      );
  }

  addEmployer(username, position, password){
    this.dataService.sendUserData({
      name:username,
      position:position,
      password:password,
      admin:this.adminStatus })
      .subscribe(
        data=>console.log(data)
      );
  }

  showTasks(){
    this.toggleMenu('tasks');
    //this.visibleControl.tasks = true;
    this.dataService.getTaskList()
      .subscribe(
        data => {
          console.log(data);
          this.tasks = data;
          if(!this.currentStatus){
            let newTaskList = [];
            this.tasks.forEach((el)=>{
              let reasponsiblePersons = el.reasponsiblePersons;
              console.log(reasponsiblePersons);
              if (reasponsiblePersons.includes(this.currentUser)){
                newTaskList.push(el);
              }
            });
            this.tasks = newTaskList;
            console.log(newTaskList);
          }
        }, error => {
          console.log(error);
        });
  }

  editTaskSend(taskName, dateStart, dateFinish){
    let data ={
      id:this.editTask._id,
      name:taskName,
      dateStart:dateStart,
      dateFinish:dateFinish,
      reasponsiblePersons:this.addEmployee
    };
    this.dataService.updateTask(data)
      .subscribe(
        (data:any)=>{
          //this.employee = data;
        }
      );
  }

  onChange(user) {
    if(arguments[1]){
      console.log('from EDIT');
    }
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

  closeModalWindow(){
    this.modal.style.visibility = 'hidden';
  }


  showComments(id){
    this.comments.style.visibility = 'visible';
    //let button = document.getElementById('sendBtn');
    //let textComment = document.getElementById('inputMsg');
    let inputValue = (<HTMLInputElement>document.getElementById('inputMsg'));
    //let commentsWindow = document.getElementById('commentsWindow');
    let currentTask;
    this.tasks.forEach((task)=>{
      if (task._id == id) currentTask = task;
    });
    this.commentsWindow.innerHTML = '';
    //let doc = document.createElement('div');
    //let title = document.createElement('p');
    //let button = document.createElement('button');
    if(!this.checkListener){
      this.sendButton.addEventListener('click',  ()=> {
        console.log('clk');
        let val = inputValue.value;
        if (val != ''){
          console.log('Пользователь: '+ this.currentUser+ '  Комментарий: '
            + val + ' Дата: ' + new Date + ' для задачи: ' + currentTask._id);
          this.addComment(currentTask._id, this.currentUser, val, new Date);
        }
      });
    }
    this.checkListener = true;

    //let textComment = document.createElement('textarea');

    //textComment.setAttribute("rows", "5");
    //textComment.setAttribute("cols", "20");
    //textComment.setAttribute("id", "comArea");
    //doc.style.height = "150px";
    //doc.style.overflow = "auto";
    //button.textContent = 'Добавить комментарий';
    //title.textContent = 'Комментарии';
    let commentText = '<b>'+currentTask.name+'</b>'+'<hr>';
    currentTask.comments.forEach((comment)=>{
      commentText+='имя: '+comment.name+'<br>'+'комментарий: '+comment.text+'<br>'+(comment.date).substr(0, 10)+'<hr>';
      console.log(typeof comment.date);
    });
    this.commentsWindow.innerHTML=commentText;
    //doc.style.height = "250px";
    //this.comments.appendChild(title);
    //this.comments.children[0].appendChild(doc);
    //this.comments.appendChild(textComment);
    //this.comments.appendChild(button);
    this.comments.style.visibility = 'visible';
  }

  addComment(id, user, commentText, date){
    let newComment = document.createElement('p');
    //let comArea = document.getElementById('comArea');
    newComment.style.color = 'blue';
    newComment.innerHTML= 'имя: '+user+'<br>'+'комментарий: '+commentText+'<br>'+date.toDateString() +'<hr>';
    //console.log(comArea);
    this.commentsWindow.appendChild( newComment);
    this.commentsWindow.scrollTop = 9999;
    let comment ={
      id:id,
      user:user,
      comment:commentText,
      date:date
    };
    this.dataService.sendComment(comment)
      .subscribe(
        (data:any)=>{
          //this.employee = data;
        }
      );
  }

  ngOnInit() {
    this.currentStatus = this.statusService.getStatus();
    this.currentUser = this.statusService.getUserName();
    console.log('admin: '+this.currentStatus);
    this.dataService.getEmployeeList()
      .subscribe(
        (data:any)=>{
          this.employee = data;
        }
      );
    if (!this.currentStatus){
      $('#addUserBtn').prop('disabled', true);
      $('#addTaskBtn').prop('disabled', true);
    }



    $( "#dateStart, #dateFinish, #newdateStart, #newdateFinish" ).datepicker({
      dayNamesMin: [ "Вс","Пон", "Вт", "Ср", "Чт", "Пт", "Сб"], firstDay: 1,
      monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
      dateFormat: "yy-mm-dd"
    });

  }




}
