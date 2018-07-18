import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Utils } from "../utils";
declare var $:any;

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Add Event Listeners for nav buttons.
  ngAfterViewInit() {
    let self = this;
    $(".sidebar-elements .parent>a").on('click', function(){
      self.toggleSubmenu(this);
    });

    $(".left-sidebar-toggle").on('click', this.toggleMainMenu);

    $(window).resize(()=>{
      Utils.waitForFinalEvent(() => {
        if (!$.isBreakpoint("sm") && !$.isBreakpoint("xs") && !$(".left-sidebar-spacer").hasClass('open') ) {
          $(".left-sidebar-spacer").show().addClass('open');
        } else if (($.isBreakpoint("sm") || $.isBreakpoint("xs")) && $(".left-sidebar-spacer").hasClass('open')) {
          $(".left-sidebar-spacer").show().removeClass('open');
        }
      },100,"toggle");
    });


  }

  toggleSubmenu(link):void {
    $(link).next().slideToggle(200).toggleClass('open');
  }

  toggleMainMenu():void {
    $(".left-sidebar-spacer").slideToggle({
      duration: 200,
      complete: () => $(".left-sidebar-spacer").toggleClass('open')
    });
  }

}
