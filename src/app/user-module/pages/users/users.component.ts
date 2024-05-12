import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usersData:any;
  currentPage: number = 1;
  totalPages: number = 0; // Replace with the total number of pages
  numberOfItemsPerPage=6;
  visiblePages: number[] = [];
  applypaginationFilter:boolean=false;
  isloading:boolean=true;
  constructor(
    private usersServices:UsersService,
    private title:Title,
    private http:HttpClient,
    private route:ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
    this.calculateVisiblePages();

  // Get initial filter options from query parameters
     this.route.queryParams.subscribe(params => {

      if(params["page"]|| params["per_page"]){
        this.applypaginationFilter=true;
        this.currentPage= parseInt(params["page"] )|| 1;
        this.numberOfItemsPerPage= parseInt(params["per_page"])||this.numberOfItemsPerPage ;
      }
    });

    // Apply filters initially
    this.applyFilters();



  }
  applyFilters() {
    // Construct query parameters from filter options
    const filters:any = {};
      if(this.applypaginationFilter){
        filters["page"]=this.currentPage;
        filters["per_page"]=this.numberOfItemsPerPage;
      }


    // Update query parameters
    this.router.navigate([], { queryParams: filters });

    // Call API or perform filtering logic to get filtered data
    this.usersServices.allusersData(filters).subscribe(

      response => {
          this.usersServices.setfilteredUsersData(response.data);
          this.usersServices.getfilteredUsersData().subscribe((res:any)=>{
            this.usersData=res;
            console.log(this.usersData.length)
            this.isloading=false;

          });
           this.totalPages=response.total_pages;
          if(this.currentPage>response.total_pages){
            this.currentPage=1;
            // Update query parameters
            filters["page"]=this.currentPage;
           this.router.navigate([], { queryParams: filters });
           this.applyFilters();


          }
          this.calculateVisiblePages();

      },
      error => {
        console.log("there is no users")
      }
    );
  }
  calculateVisiblePages() {
    const range = 2; // Number of visible pages on each side of the current page
    const totalVisiblePages = range * 2 + 1; // Total visible pages including current page

    const startPage = Math.max(this.currentPage - range, 1);
    const endPage = Math.min(this.currentPage + range, this.totalPages);

    this.visiblePages = [];

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.applypaginationFilter=true;

      this.currentPage = page;
      this.calculateVisiblePages();
      this.applyFilters();

    }
  }

}
