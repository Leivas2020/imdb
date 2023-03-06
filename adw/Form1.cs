using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace adw
{
  public partial class Form1 : Form
  {
    List<sre1> sass = new List<sre1>();
    SaveFileDialog Save
    public Form1()
    {
      InitializeComponent();
    }

    private void button1_Click(object sender, EventArgs e)
    {
      sre1 x = new sre1();
      x.name = textBox1.Text;
      x.surmane = textBox2.Text;
      x.age = int.Parse(textBox3.Text);
      x.email = textBox4.Text;
    }

  }
}
